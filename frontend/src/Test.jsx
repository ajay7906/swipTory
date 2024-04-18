// AddStory.js
import React, { useState } from 'react';
import axios from 'axios';
const Test = () => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);

  const storeData = () => {
    if (heading && description && imageUrl && category) {
      setData([
        ...data,
        {
          heading,
          description,
          imageUrl,
          category,
        },
      ]);
      setHeading('');
      setDescription('');
      setImageUrl('');
      setCategory('');
    }
  };
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/api/stories', {
          userId: '123456789', // Replace with the actual user ID
          data,
        });
        setData([]);
      } catch (error) {
        console.error(error);
      }
    console.log(data);
  };

  return (
    <div className="container">
      <h1>Add a New Story</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" >
          Slide
        </button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label" htmlFor="heading">
            Heading:
          </label>
          <input
            className="input"
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="description">
            Description:
          </label>
          <textarea
            className="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label className="label" htmlFor="image">
            Image URL:
          </label>
          <input
            className="input"
            type="text"
            id="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="category">
            Category:
          </label>
          <select
            className="select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="health-fitness">Health &amp; Fitness</option>
            <option value="travel">Travel</option>
            <option value="movie">Movie</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div className="button-group">
          <button className="button button-prev" type="button">
            Previous
          </button>
          <button className="button button-next" type="button" onClick={storeData}>
            Next
          </button>
          <button className="button button-post" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;