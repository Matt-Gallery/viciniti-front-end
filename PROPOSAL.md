# Viciniti

## Project Description

### Our application is called Viciniti. It matches users who consume delivered services and products with corresponding providers in a way that facilitates piggybacking multiple deliveries together in order to create efficiencies and cost savings for both parties and drive more sales for the providers.

## Application Description

The purpose of the application is to make the delivery of products and services to consumers more efficient by generating orders/reservations that are grouped closely toghther. We do this by pushing disount options to users based on their proximity to existing orders/reservations with a given service/product provider. This allows the providers to generate more business while reducing delivery costs and it allows users to get better pricing.

## User Stories

### MVP Goals
- **Create Account**
    - As a user, I want to be able to create an account, so that I can save all my wardrobe items and preferences.
- **Log In**
    -As a user, I want to be able to log in to my account, so that I can save my wardrobe items and preferences and get outfit recommendations.
- **View Account Details**
    - As a user, I want to be able to view my account details, so that I can know that my account information is accurate.
    - This page can be the same as the create account page, but the fields will be populated with the users saved information and they can edit and resave each field.
- **Edit Account Details**
    - As a user, I want to be able to edit my account details, so that I can update any details if they change or fix any errors.
- **Delete Account**
    - As a user, I want to be able to delete my account, so that I can protect my data and reduce spam communications if I choose to no longer use this application.
    - This feature will be included on the edit account page, it just adds a delete button.
- **Create New Wardrobe Items**
    - As a user, I want to be able to add items to my wardrobe and assign each item a rating so that those items are included in my outfit recommendations.
    - Each wardrobe item should include basic parameters for the weather conditions in which that item should be worn.
- **Update/Delete Wardrobe Items**
    - As a user, I want to be able to update or delete any of the items saved in my wardrobe so that the items in my wardrobe are accurate.
- **View Outfit Recommendations**
    - As a user, I want to receive recommendations for outfits to wear based on the items saved in my wardrobe and the weather forecast.
- **Cycle Wardrobe Item Recommendations**
    - As a user, I want to to be able to tell the app that I don't want to wear a particular wardrobe item today and have it cycle that item to another recommendation so I can get to an outfit combination that I like.
- **Cycle Outfit Recommendation**
    - As a user, I want to to be able to:
      * Tell the app that I don't want to wear a recommended outfit today and have it cycle the entire outfit to another recommendation
      * Tell the app that I don't want to wear a recommended outfit ever and have it cycle that entire outfit to another recommendation and save this preference and have it applied to future recommendations
- **View Rated Outfits**
    - As a user, I want to to be able to view all of the outfits I've rated.
- **Edit Rated Outfits**
    - As a user, I want to to be able to edit each of the outfits I've rated.

### Stretch Goals
- **More Specific Response Options for Recommendations**
    - As a user, when I'm cycling through different outfit options I want to be able to specify whether I'm rejecting a particular wardroom item for today's outfit or I don't like that item in combination with the rest of a recommended outfit so I never want to see that combination again so that I can better refine my future recommendations.
- **Adjust Mix of Recommendations Between Rated and Unrated Outfits**
    - As a user, I want to be able to adjust the mix of outfit recommendations I receive between ones that I've rated and new ones that I haven't rated.
- **Connect Wardrobe Item Creation Function to Web/Internal DB Search for Item**
    - As a user, as I'm creating/editing a wardrobe item I want to be given example items to choose from pulled from the web so that I can select the actual item and have it easily populated with correct information and photo.
- **Wish/Shopping List**
    - As a user, I want to be able to create a wish/shopping list so that I can keep track of items I want to add to my wardrobe and can more easily shop for them.
- **Trip Packing List**
    - As a user, I want to be able to create multi-day sets of outfits so that I can plan my wardrobe over longer periods and can create packing lists when traveling.
- **Cost Per Wear Tracking**
    - As a user, I want to be able to track what I've paid for items in my wardrobe and see the running cost per wear so that my shopping decisions can be better informed.
- **Specific Occasion Filter**
    - As a user, I want to be able to filter my outfit recommendations based on what I have planned for the day so that I get better recommendations more quickly.
- **More Detailed User Profile**
    - As a user, I want to be able to save more information about myself to my profile so that I get better recommendations more quickly.

## Wire Frames
### Application Web Pages

![Wireframes](https://github.com/Matt-Gallery/weather-wardrobe/blob/main/Wireframes.png?raw=true)

## Component Hierarchy Diagram
![Component Hierarchy Diagram.png](https://github.com/Matt-Gallery/weather-wardrobe/blob/72f1af3455e0e9dcdc4ba4d14db63eabf8816323/Component%20Hierarchy%20Diagram.png)

## Entity Relationship Diagram (ERD)

![ERD](https://github.com/Matt-Gallery/weather-wardrobe/blob/main/ERD.png?raw=true)



## Routing Table

![Routing Table](https://github.com/Matt-Gallery/weather-wardrobe/blob/main/Routing%20Table%202.png?raw=true)


## Pseudocode

## Timeline

| Day        |   | Task                               | Blockers | Notes/ Thoughts |
|------------|---|------------------------------------|----------|-----------------|
| Monday     |   | Create and present proposal        |          |                 |
| Tuesday    |   | Create Auth, Routes, Components    |          |                 |
| Wedenesday |   | Integrate Front & Back Ends        |          |                 |
| Thursday   |   | Work on JavaScript & CSS           |          |                 |
| Friday     |   | Test and finalize MVP              |          |                 |
| Saturday   |   | Work on stretch goals              |          |                 |
| Sunday     |   | Final testing and styling          |          |                 |
| Monday     |   | Present                            |          |                 |
# viciniti-front-end



# Viciniti – Full API Routing Table (Finalized for MVP Logic)

## Auth & Role Setup

| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/signup` | POST | Create a new user and select role (customer or provider) | Public |
| `/api/login` | POST | Authenticate user and return role info | Public |
| `/api/logout` | POST | Log out user | Authenticated |
| `/api/provider-info` | POST | Step 2: Provider enters business details | Public (after selecting provider role) |

---

## Dashboard Logic (Role-Based)

| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/dashboard` | GET | If Customer: return service categories. If Provider: return weekly appointment schedule | Authenticated |
| `/api/sub-services?category=Nails` | GET | Return sub-services for selected category (Customer) | Authenticated |
| `/api/available-slots` | POST | Return available time slots for selected sub-service | Authenticated |
| `/api/confirm-appointments` | POST | Confirm and save selected appointments (after selecting time slot) | Authenticated |

---

## Appointments

| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/appointments` | GET | View customer’s booked appointments | Authenticated (Customer) |
| `/api/appointments/:id` | PUT | Edit a customer’s own appointment | Authenticated (Customer) |
| `/api/appointments/:id` | DELETE | Cancel a customer’s own appointment | Authenticated (Customer) |

---

## Provider Sub-Services Management

| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/my-services` | GET | Provider views all of *their* sub-services | Authenticated (Provider) |
| `/api/my-services` | POST | Provider adds a new sub-service | Authenticated (Provider) |
| `/api/my-services/:id` | PUT | Edit a sub-service | Authenticated (Provider) |
| `/api/my-services/:id` | DELETE | Delete a sub-service | Authenticated (Provider) |

---

## Notifications

| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/notifications/subscribe` | POST | Subscribe to provider or service category | Authenticated |
| `/api/notifications` | GET | View user’s notifications | Authenticated |







Note: For customers, the entire booking flow (service → sub-service → schedule → confirm) happens on the same dashboard view using these routes.
