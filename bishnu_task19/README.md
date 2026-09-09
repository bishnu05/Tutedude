# Service Booking Web App

Vanilla JavaScript DOM-based service booking UI matching the supplied reference flow.

## Required service flow

- Initially, the first service is displayed on the right.
- **Add Item:** adds the current service immediately to the left-side Added Items list, updates Total Amount, then automatically displays the next service on the right.
- **Skip Item:** does not add the current service, and automatically displays the next service on the right.
- Services are therefore browsed one at a time.
- Added items can be removed from the left list.
- Book Now becomes enabled when at least one service is in the cart.

## Files

- `index.html`
- `style.css`
- `script.js`
- `README.md`

## Run

Open `index.html` in a modern browser. Service images are loaded from Unsplash, so internet access is recommended.


## Important click handling

The service card uses a single delegated click listener on `#serviceArea`. The buttons are not given additional individual click listeners during re-render. This prevents one click from firing the Add/Skip action twice.


## UI update
- The bottom-right `Add to Cart` and adjacent `Book Now` buttons were removed.
- The service-level `Add Item` / `Skip Item` flow remains unchanged.
- Typography was increased by approximately 4–5px for readability.

## Empty Cart Book Now behavior

The left-side **Book Now** button remains clickable even when the cart is empty. The message `ⓘ Add the items to the cart to book` is hidden initially and appears only after the user clicks **Book Now** without adding any service. Once a service is added, the message stays hidden.
