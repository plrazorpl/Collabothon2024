create table if not exists db.account_seq
(
    next_val bigint null
);

create table if not exists db.customer
(
    id               bigint auto_increment
    primary key,
    customer_address varchar(255) not null,
    customer_name    varchar(255) not null
    );

create table if not exists db.account
(
    balance        double                                                  not null,
    customer_id    bigint                                                  not null,
    id             bigint                                                  not null
    primary key,
    account_number varchar(255)                                            not null,
    currency       enum ('DOLAR', 'EURO', 'POUND', 'RUBLE', 'YEN', 'YUAN') not null,
    constraint FKnnwpo0lfq4xai1rs6887sx02k
    foreign key (customer_id) references db.customer (id)
    );

create table if not exists db.transactions
(
    transaction_value double       not null,
    customer_id       bigint       not null,
    id                bigint auto_increment
    primary key,
    transaction_date  datetime(6)  not null,
    currency_code     varchar(255) not null,
    transaction_type  varchar(255) not null
    );

create table if not exists db.visit
(
    visit_duration int         not null,
    customer_id    bigint      not null,
    id             bigint auto_increment
    primary key,
    visit_date     datetime(6) not null
    );

