drop database if exists easylistdb;
drop user if exists 'easylist'@'localhost';

create database easylistdb;
create user 'easylist'@'localhost' identified by 'easylistpwd';
grant all on easylistdb.* to 'easylist'@'localhost';

use easylistdb;

create table users(
	username varchar(255) not null,
	password varchar(255) not null,
	primary key (username)
);
