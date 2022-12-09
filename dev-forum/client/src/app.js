import PostsApi from './api/posts';
import { $el, $appendTo, $qs } from 'fxdom';
import { go, pipe, strMap } from 'fxjs';

const Navbar = {};
Navbar.tmpl = (navs) => `
  <nav class="navbar">
    <ul class="navbar__content">
      ${strMap(nav =>
        `<li class="navbar__list">
          <a href="${nav.id}">${nav.name}</a>
        </li>
      `, navs)}
    </ul>
  </nav>
`;

const Posts = {};
Posts.tmpl = posts => `
  <div class="post">
    <ul class="post__content">
      ${strMap(post => `
        <li class="post__list">
          <a class="post__board" href="${post._.board.id}">${post._.board.name}</a>
          <span class="post__title">${post.title}</span>
          <span class="post__likes">좋아요: ${post._.posts_likes}</span>
          <span class="post__author">작성자: ${post._.user.name}</span>
        </li>
      `, posts)}
    </ul>
</div>
`;


const renderNavbar = () => go(
  [{ name: '프론트엔드', id: 'frontend' }, { name: '백엔드', id: 'backend' }, { name: '인프라', id: 'infra' }, { name: '알고리즘', id: 'algorithm' }],
  Navbar.tmpl,
  $el,
  $appendTo($qs('body'))
);

const renderPosts = () => go(
  PostsApi.fetchPosts(),
  Posts.tmpl,
  $el,
  $appendTo($qs('body'))
);

renderNavbar();
renderPosts();
