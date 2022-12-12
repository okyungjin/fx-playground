const express = require('express');
const { pick, reduce, flatten, map } = require('fxjs');
const { POOL: { QUERY, QUERY1, EQ, VALUES, SET, ASSOCIATE, COLUMN, SQL }} = require('../config/database');

const fetchPosts = async () => {
  const posts = await ASSOCIATE`
      posts
        - user ${{
    column: COLUMN('name'),
  }}
        < posts_likes ${{
    hook: likes => likes.length
  }}
        - board ${{
    column: COLUMN('name'),
    query: SQL`WHERE is_hidden = false`
  }}
    `;
  // TODO: sort by using SQL
  const sorted = posts.sort((a, b) => a.id > b.id ? 1 : -1);
  return sorted;
};
