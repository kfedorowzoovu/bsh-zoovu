# Add to Cart Button

## Overview

This component introduces an "Add to Cart" button.

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

## How It Works

- **Client Environment:**
  - The button operates within the client's environment, utilizing a specific template provided by the client.
  - The template dynamically incorporates the SKU ID and data AJAX URL.
  - The functionality triggering the "Add to Cart" action resides on the client's website.

## Visibility Configuration

- **Data-Driven Visibility:**
  - The button's visibility is data-driven, determined by the value of the "catalog_visibility_type" column.
  - If "catalog_visibility_type" equals SHOP, the button will be visible for the corresponding product; otherwise, it remains hidden.

## Context Variable Control

- **Forceful Visibility Control:**
  - A context variable in Conversational Studio allows for forceful control over the button's visibility.
  - Access the variable in Conversational Studio settings, enabling the adjustment of the boolean value to show or hide the button.

## Dynamic Handling of Country Codes in API Endpoint

- **Data Catalog Check:**
  - Utilizes an API endpoint triggered by a button.
  - The endpoint interacts with a data catalog, checking the "country_code" column.
  - If the column contains a valid country code, it's included in the API endpoint; otherwise, it's excluded.

## Additional Details

- **EXD Configurations:**

  - Configurations have been set up to style the "Add to Cart" button, providing flexibility in appearance.

- **Powerful Functionalities:**
  - Custom JavaScript and URL attachments from the data catalog can be seamlessly integrated into this button, offering extended functionalities based on client requirements.

## Integration Details

- **Client-Side Operation:**
  - The "Add to Cart" button functions as a normal placeholder on our side.
  - On the client's website, where this assistant is integrated, the button interacts with a window object (T) containing specific methods for seamless operation.

## Conclusion

This "Add to Cart" button is a versatile component designed to enhance the shopping experience. Its dynamic visibility, controlled by data and context variables, makes it a powerful tool for customization within the client's environment. Integration details, EXD configurations, and additional functionalities provide a comprehensive solution for diverse client needs.
