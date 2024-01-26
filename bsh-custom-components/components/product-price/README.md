# Custom Product Price - README

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

## Overview

This document provides information about the Custom Product Price component.

## Component Availability

The Custom Product Price component is available for both top product and recommendation products.

## Visibility Logic

The button's visibility is data-driven and determined by the built-in functionality to check the column name (`catalog_visibility_type`). If `catalog_visibility_type` is equal to "SHOP," the button will be visible for that particular product. Otherwise, it will be hidden automatically.

## Context Variable for Forced Visibility

To forcibly show or hide this button, a context variable (`displayProductPrice`) is defined on Conversational Studio. Changing the boolean value of this variable will show or hide the button on the assistant level.

**Where to Find the Context Variable:**

- Login to Conversational Studio.
- Go to settings and click on context settings.
- Edit the context variable and change the boolean value to `true` or `false` to show or hide the price.

## Activation Instructions

To activate the component, follow these steps:

1. **Access 'Top Product'/'Recommendations' Settings:**
   - Navigate to the settings for 'Top Product' or 'Recommendations.'
2. **Enable the Product Price Component:**
   - Activate the Product Price component.
   - Select 'BSH Product Price.'

## Format Price Functionality

### Normal Price

- Price with currency.
- Price without currency.
- Price with comma and dash.

### Discount Price

- To show the discount price, fill in the 'Original Price Column Name.' This value is the name of the column in the catalog with original prices used before the discount.
- If a product has a value in this column, two prices will be shown for the product. Each price can be styled separately using the 'Original Price Font' and 'Discount Price Font' settings.
- Separate settings are available for the normal price without a discount: 'Price Font' settings.

## Price Description Functionality

- RRP (Recommended Retail Price) text and Shop Price description have their own style settings.
- The text will be translated for all locations (set it up in the translation tab).

Ensure proper configurations for optimal presentation and functionality of the Custom Product Price component. If you have any questions or encounter issues, please refer to the associated JIRA tasks for further details.
