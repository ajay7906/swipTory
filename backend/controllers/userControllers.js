
const User = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const email = String(req.body.email || '').trim().toLowerCase();

        if (!username || !password || !email) {
            return res.status(400).json({
                errorMessage: "complete all filled",
                success: false
            });
        }
        const isExistingUser = await User.findOne({ username: username });
        if (isExistingUser) {
            return res
                .status(409)
                .json({ success: false, errorMessage: "User already exists" });
        }
        if (await User.findOne({ email })) return res.status(409).json({ success: false, errorMessage: 'An account already uses this email' });


        const hashedPassword = await bcrypt.hash(password, 10);

        let verificationToken = process.env.RESEND_API_KEY && process.env.MAIL_FROM ? crypto.randomBytes(32).toString('hex') : null;
        const userData = new User({
            username,
            email,
            password: hashedPassword,
            ...(verificationToken ? { emailVerificationToken: crypto.createHash('sha256').update(verificationToken).digest('hex'), emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 } : {}),

        });
        await userData.save();
        if (verificationToken) {
            const clientUrl = process.env.CLIENT_URL || 'https://swip-tory-six.vercel.app';
            try { await sendEmail({ to: email, subject: 'Verify your SwipTory email', html: `<p>Hi ${username},</p><p>Verify your email to finish setting up your SwipTory account.</p><p><a href="${clientUrl}/verify-email?token=${verificationToken}">Verify email</a></p><p>This link expires in 24 hours.</p>` }); }
            catch (_) { verificationToken = null; userData.emailVerificationToken = undefined; userData.emailVerificationExpires = undefined; await userData.save(); }
        }
        const token = verificationToken ? undefined : jwt.sign(
            { userId: userData._id, username: userData.username, email: userData.email },
            process.env.SECRET_CODE,
            { expiresIn: "60h" }
        );
        res.json({
            success: true,
            message: "User registered successfully",
            token: token,
            username: userData.username,
            verificationRequired: Boolean(verificationToken),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, errorMessage: "Something went wrong!" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request! Invalid credentials",
            });
        }
        const userDetails = await User.findOne({ username });

        if (!userDetails) {
            return res
                .status(401)
                .json({ success: false, errorMessage: "Please enter valid username" });
        }

        if (userDetails.emailVerificationToken) return res.status(403).json({ success: false, errorMessage: "Please verify your email before signing in" });

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ success: false, errorMessage: "Please enter valid password" });
        }

        const token = jwt.sign(
            { userId: userDetails._id, username: userDetails.username },
            process.env.SECRET_CODE,
            { expiresIn: "60h" }
        );

        res.json({
            success: true,
            message: "Login Successfully",
            token: token,
            username: userDetails.username,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, errorMessage: "Something went wrong!" });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const tokenHash = crypto.createHash('sha256').update(String(req.body.token || '')).digest('hex');
        const user = await User.findOne({ emailVerificationToken: tokenHash, emailVerificationExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ success: false, errorMessage: 'Verification link is invalid or expired' });
        user.emailVerified = true; user.emailVerificationToken = undefined; user.emailVerificationExpires = undefined; await user.save();
        res.json({ success: true, message: 'Email verified. You can now sign in.' });
    } catch (error) { res.status(500).json({ success: false, errorMessage: 'Could not verify email' }); }
};

const requestPasswordReset = async (req, res) => {
    try {
        if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) return res.status(503).json({ success: false, errorMessage: 'Password reset email is not configured. Set RESEND_API_KEY and MAIL_FROM on the backend.' });
        const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
        if (user) {
            const token = crypto.randomBytes(32).toString('hex');
            user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
            user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
            await user.save();
            const clientUrl = process.env.CLIENT_URL || 'https://swip-tory-six.vercel.app';
            await sendEmail({ to: user.email, subject: 'Reset your SwipTory password', html: `<p>Use this link to reset your password within one hour:</p><p><a href="${clientUrl}/reset-password?token=${token}">Reset password</a></p>` });
        }
        res.json({ success: true, message: 'If that email has an account, a reset link will be sent.' });
    } catch (error) { res.status(500).json({ success: false, errorMessage: 'Could not request password reset' }); }
};

const resetPassword = async (req, res) => {
    try {
        const tokenHash = crypto.createHash('sha256').update(String(req.body.token || '')).digest('hex');
        const user = await User.findOne({ passwordResetToken: tokenHash, passwordResetExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ success: false, errorMessage: 'Reset link is invalid or expired' });
        if (String(req.body.password || '').length < 8) return res.status(400).json({ success: false, errorMessage: 'Password must be at least 8 characters' });
        user.password = await bcrypt.hash(req.body.password, 10); user.passwordResetToken = undefined; user.passwordResetExpires = undefined; await user.save();
        res.json({ success: true, message: 'Password updated. You can sign in now.' });
    } catch (error) { res.status(500).json({ success: false, errorMessage: 'Could not reset password' }); }
};

module.exports = { registerUser, loginUser, verifyEmail, requestPasswordReset, resetPassword };
