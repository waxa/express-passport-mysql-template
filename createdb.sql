drop database if exists easylistdb;
drop user if exists 'easylistuser'@'localhost';

create database easylistdb;
create user 'easylistuser'@'localhost' identified by 'easylistpwd';
grant all on easylistdb.* to 'easylistuser'@'localhost';

use sampledb;

create table users(
	username varchar(255) not null,
	password varchar(255) not null,
	primary key (username)
);
