# Product Waitlist - README

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

## Overview

This document provides information about the Product Waitlist component. Please note that only HTML is provided here, and styles and JS are supported in the production environment. In Zoovu environments, a placeholder will be shown.

## Component Availability

The Product Waitlist component is available for both top product and recommendation products.

## Activation Instructions

To activate the component, follow these steps:

1. **Login to Platform:**

   - Log in to the platform.

2. **Navigate to Settings:**

   - Go to settings > context settings.

3. **Find Context Variable:**
   - In the context section, find the context variable named `displayWaitlistButton`.
4. **Toggle Visibility:**
   - If the value is `false`, the button will be hidden for the specific assistant. If the value is `true`, the button will be visible for the assistant.

## Additional Activation Instructions

To further activate the component, follow these steps:

1. **Access 'Top Product'/'Recommendations' Settings:**

   - Navigate to the settings for 'Top Product' or 'Recommendations.'

2. **Activate 'PRODUCT AVAILABILITY AFTER TEXT' Component:**
   - Activate the `PRODUCT AVAILABILITY AFTER TEXT` component.
   - Find the 'Show product waitlist button' setting and activate it.

## Conditions for Displaying Product Waitlist

The Product Waitlist will be shown only if the following conditions are met:

- It is enabled in Experience Designer (ExD).
- The value of `catalogVisibilityType` is equal to "SHOP."
- The value of `buyable` is equal to FALSE.
- The value of `permanently_not_available` is equal to FALSE.

## Data Action Endpoint Configuration

The final API request will be sent by BSH to a URL built like this:

`${window.location.origin}/${country_code}/${dataActionEndpoint}`

If there is no data from the `country_code` data column provided, it will be omitted.

## Expected Results

- **Zoovu Environment:**
  ![Zoovu Environment Placeholder](zoovu_environment_placeholder.png)

- **Production Environment:**
  ![Production Environment Result](production_environment_result.png)

## Dynamic Handling of Country Codes in API Endpoint

This code snippet provided by BSH utilizes an API endpoint triggered by a button. The endpoint interacts with a data catalog and performs a check on the column name. If the column named "country_code" contains a valid country code, it will be automatically included in the API endpoint. Otherwise, if the "country_code" column does not have a country code, it will not be added to the API endpoint.

Ensure proper configurations for optimal presentation and functionality of the Product Waitlist component. If you have any questions or encounter issues, please refer to the associated JIRA task for further details.
