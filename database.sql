create table if not exists
  events (
    id bigint primary key generated always as identity,
    event_name text not null,
    city_name text not null,
    event_date date not null,
    event_time time not null,
    latitude float not null,
    longitude float not null,
    constraint no_duplicate_rows unique (
      event_name,
      city_name,
      event_date,
      event_time,
      latitude,
      longitude
    )
  );