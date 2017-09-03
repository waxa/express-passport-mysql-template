drop database if exists sampledb;
drop user if exists 'sampleuser'@'localhost';

create database sampledb;
create user 'sampleuser'@'localhost' identified by 'samplepassword';
grant all on sampledb.* to 'sampleuser'@'localhost';

use sampledb;

create table users(
	username varchar(255) not null,
	password varchar(255) not null,
	primary key (username)
);
