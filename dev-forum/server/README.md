# Server

- [DDL](#ddl)
  - [users](#users)
  - [boards](#boards)
  - [posts](#posts)
  - [posts\_likes](#posts_likes)

<br>

## DDL
### users
```sql
create table users
(
    id         varchar(20)             not null
        primary key,
    name       varchar(20)             not null,
    email      varchar(30)             not null
        constraint users_pk
            unique,
    created_at timestamp default now() not null,
    deleted_at timestamp,
    password   varchar                 not null
);

comment on table users is '사용자';
```
<br>

### boards
```sql
create table boards
(
    name      varchar(20)           not null,
    id        varchar(20)           not null
        constraint boards_pk
            primary key,
    is_hidden boolean default false not null
);

comment on table boards is '게시판';
```

<br>

### posts
```sql
create table posts
(
    id          serial
        constraint posts_pk
            primary key,
    title       varchar(100)            not null,
    description text                    not null,
    user_id     varchar(20)             not null
        constraint posts_users_id_fk
            references users,
    board_id    varchar(20)             not null
        constraint posts_boards_id_fk
            references boards,
    created_at  timestamp default now() not null,
    deleted_at  timestamp,
    image_url   text
);

comment on table posts is '게시글';
```

<br>

### posts_likes
```sql
create table posts_likes
(
    post_id integer     not null
        constraint "post-likes_posts_id_fk"
            references posts,
    user_id varchar(20) not null
        constraint posts_likes_users_id_fk
            references users,
    constraint posts_likes_uk
        unique (post_id, user_id)
);

comment on table posts_likes is '게시글 좋아요';
```
