
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255)  NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    biography TEXT
    mobile_number VARCHAR(20),
    pic_url VARCHAR(255)
);

CREATE TABLE ride_types (
    ride_type_id UUID PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  post_id UUID DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  ridetype VARCHAR (20),
  location VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  max_pax INTEGER NOT NULL,
  details TEXT,
  todate DATE,
  fromdate DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id)
);


CREATE TABLE post_enquiries (
    enquiry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
    enquirer_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE rider_reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    reviewed_user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    points INTEGER NOT NULL CHECK (points IN (-1, 1)),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_registrations (
    registration_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



`   