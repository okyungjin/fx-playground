import PostsApi from './api/posts';
import { $el, $appendTo, $qs } from 'fxdom';
import { go, pipe, tap, strMap } from 'fxjs';

const Navbar = {};
Navbar.tmpl = (navs) => `
  <nav class="navbar">
    <h1 class="logo"><a href="#">Logo</a></h1>
    <ul class="menus">
      ${strMap(nav =>
        `<li class="menu ${nav.klass ?? ''}">
          <a href="${nav.id}"><span>${nav.name}</span></a>
        </li>
      `, navs)}
    </ul>
  </nav>
`;

const Posts = {};
Posts.tmpl = posts => `
  <div class="posts-container">
    <table class="posts">
     <ul>
      ${strMap(post => `
        <li class="post">
          <section class="header">
            <span class="author">${post._.user.name}</span>
            <span class="timestamp">ยท 1 day ago</span>

          </section>
          <section class="body">
            <div>
              <div class="title">${post.title}</div>
              <div class="desc">${post.description}</div>
            </div>
            <img class="thumbnail ${post.image_url ? '' : 'hidden'}" src="${post.image_url}" />
          </section>
          <section class="footer">
            <span class="board">
              <a href="${post._.board.id}">${post._.board.name}</a>
            </span>
            <span class="likes">
              <span>๐ค</span>
              <span>${post._.posts_likes}</span>
            </span>
          </section>
        </li>
      `, posts)}
      </tbody>
    </table>
</div>
`;


const renderPosts = () => go(
  PostsApi.fetchPosts(),
  Posts.tmpl,
  $el,
  $appendTo($qs('body'))
);

const renderNavbar = () => go(
  [{ name: 'ํ๋ก ํธ์๋', id: 'frontend' }, { name: '๋ฐฑ์๋', id: 'backend' }, { name: '์ธํ๋ผ', id: 'infra' }, { name: '์๊ณ ๋ฆฌ์ฆ', id: 'algorithm' },  { name: '๋ก๊ทธ์ธ', id: 'login', klass: 'login'}],
  Navbar.tmpl,
  $el,
  $appendTo($qs('body'))
);

renderNavbar();
renderPosts();
