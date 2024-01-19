# Configuration Guide for Custom Components

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

------------------------------------------------------------------------------------------

## Dealer Locator Button

### Overview
The Dealer Locator Button is a custom component designed to toggle the visibility of a button based on specific conditions. This functionality is implemented through executable JavaScript. The following document outlines the configuration settings and conditions associated with the Dealer Locator Button.

### Component Availability
The component is available for both the top product and recommendation products.

### Activation Conditions

To activate the component, follow these steps:

1. **Login to Platform:** Log in to the platform.
2. **Navigate to Settings:** Go to settings > context settings.
3. **Context Variable:** In the context section, find the context variable named `displayDealerLocatorButton`.
4. **Toggle Visibility:** If the value is `false`, the button will be hidden for the specific assistant. If the value is `true`, the button will be visible for the assistant.

### Additional Context Variable Setting

There is an additional context variable that determines whether to hide the Dealer Locator Button for shop products. Follow these conditions:

- If the value of the context variable is `true`, the button will be hidden for shop products where the data catalog visibility type is set to "shop."
- If the value is `false`, the button will be visible for both shop and marketing products.

### URL Specification

You can specify the URL for the Dealer Locator Button using the context variable. If a URL is added, the SKU of the products will be dynamically appended. When a user clicks the button, they will be navigated to the specified location, and the SKU will be added at the end of the URL as a parameter.

### Button Link Composition

The link for the button is composed of two parts:
1. The first part is common for all products in the assistant and is derived from the 'Custom URL' field.
2. The second part is unique for each product and is obtained from the 'Property Column Name,' where the value is a column name from the catalog.

### Additional Code Implementation

A boolean value in the code determines whether to hide the "Dealer Locator" button for certain types of products on an assistant. The code checks if the "catalogVisibilityType" in the data catalog is set to "SHOP." If so, it further checks if the button should be hidden for "SHOP" products based on additional conditions.

In summary, this code is utilized to decide whether to display the "Dealer Locator" button for "SHOP" products, considering specific conditions.

Please ensure these configurations align with the desired behavior of the Dealer Locator Button.

------------------------------------------------------------------------------------------

## Buy Online Button and Retailer's Logos Components

### Overview
This document provides information and instructions for the Buy Online Button and Retailer's Logos components. These components enhance the user experience by dynamically displaying logos and enabling online purchasing based on specific conditions.

### Buy Online Button Configuration

#### Activation Conditions
- The Buy Online button's visibility is determined by the `catalog_visibility_type` in the data catalog.
  - If `catalog_visibility_type` is set to "MARKETING," the button will be visible for that particular product; otherwise, it will be hidden.

#### Component Activation
1. **Login to Platform:** Log in to the platform.
2. **Navigate to Settings:** Go to settings > context settings.
3. **Context Variable:** In the context section, find the context variable named `displayBuyOnlineButton`.
4. **Toggle Visibility:** If the value is `false`, the button will be hidden for the specific assistant. If the value is `true`, the button will be visible for the assistant.

#### Button Visibility Logic
The button's visibility is dynamically determined by an API call triggered by the Retailer's Logos component. The following conditions apply:

- **Dealers List (1-4 Dealers):**
  - Logos are displayed directly on the recommendation page.
  - The "Buy Online" button (Show More) is hidden.

- **Dealers List (More than 4 Dealers):**
  - The first 4 dealers' logos are displayed directly.
  - The "Buy Online" button (Show More) is displayed below the logos.
  - Clicking the button triggers an AJAX link from `typeGroups` and opens an overlay/popup.

- **Dealers List Empty but typeGroups Exist:**
  - No logos are displayed.
  - The "Buy Online" button (Show More) is displayed.
  - Clicking the button triggers the AJAX URL in `href`, opening an overlay with dealer information.

- **Dealers List Empty and typeGroups Null:**
  - Both logos and the "Buy Online" button are hidden.
  - This scenario may occur if BuyOnline configuration is disabled for a website or if a product lacks dealer information.

#### Popup Functionality
- The component opens a popup with a list of retailers.
- Functionality is fully operational on BSH environments; on the Zoovu Platform, it serves as a placeholder for visibility checks.

#### Data Catalog Check for Visibility
- The component is visible if the data contains a column named `catalogVisibilityType` with a value equal to "MARKETING."

### Dynamic Handling of Country Codes in API Endpoint

- This code snippet, provided by BSH, incorporates an API endpoint triggered by a button.
- The endpoint checks the "country_code" column in the data catalog and automatically includes a valid country code if present.
- The absence of a country code in the "country_code" column results in exclusion from the API endpoint.

### Experience Designer (EXD) Configurations

- Configurations for styling the Buy Online button have been implemented to enhance the button's appearance.

- Additional configurations for the popup that appears when clicking the Buy Online button are available in the Experience Designer. This includes editable text within the popup.

**Note:** The provided popup template and associated functionalities are implemented by BSH.

Please follow these instructions and configurations to ensure the optimal functioning of the Buy Online Button and Retailer's Logos components.

------------------------------------------------------------------------------------------

## Combinable Products Button

### Overview
This document provides information and instructions for the Combinable Products Button component, associated with JIRA Task CD-16083. The component enhances the user experience by allowing easy access to combinable products associated with a specific item.

### Component Availability

The Combinable Products Button is available for both top products and recommendation products.

### Activation Instructions

To activate the component, follow these steps:

1. **Top Product/Recommendations Settings:** Access 'Top Product' or 'Recommendations' settings.
   
2. **Login to Platform:** Log in to the platform.

3. **Navigate to Settings:** Go to settings > context settings.

4. **Context Variable Activation:** In the context section, find the context variable named `displayCombinableProducts`.

5. **Toggle Visibility:** If the value is `false`, the button will be hidden for the specific assistant. If the value is `true`, the button will be visible for the assistant.

### Placeholder in Experience Designer (EXD)

For convenience, a placeholder button will be visible in the Experience Designer (EXD) for styling and formatting purposes. However, in the production environment, the following conditions must be met to display the button:

- **Property Column Name:** Specify the "Property Column Name" from which the combinable products URL will be obtained. By default, it is set to "combinableProductsURL," and this property should be available for the product.

- **Custom Type Name:** Specify the "Custom Type Name." By default, it is set to "combinable

_products." A request will be made to the "Property Column Name," and the response should contain a "type" property that must match with this value.

### Button Formatting

The button will be shown as a link by default but can be formatted as a button if needed.

### Note

Ensure that the specified conditions are met to correctly display the Combinable Products Button. If you encounter any issues, refer to the JIRA Task CD-16083 for further details.

Thank you for using the Combinable Products Button component to enhance your product finders on the BSH platform. If you have any questions or concerns, please reach out to the support team.

------------------------------------------------------------------------------------------

## Retailer Logo Buttons

### Overview
This document provides information and instructions for the Retailer Logo Buttons component, associated with JIRA Task CD-2413. This component enhances the presentation of retailer logos on the result page, allowing users to easily identify and interact with dealers associated with specific products.

### Component Availability

The Retailer Logo Buttons component is available for both top products and recommendation products.

### Activation Instructions

To activate the component, follow these steps:

1. **Context Schema Activation:**
   - Go to the context schema.
   - Enable the context variable value to `true` if you want to show retailer logos.

### How It Works

The component triggers an AJAX call as soon as the result page appears. The call is made to [site-prefix]/ajax/product/dealer/integration/buttons, where [site-prefix] can be the domain with or without a country code.

The response structure is as follows:

- Every button triggers its own AJAX call to check whether retailer logos are available in the API response.
- Based on the response data, the component displays retailer logos or a "Buy Online" button.

### Button Display Logic

- **Dealers List (1-4 Dealers):**
  - Returned response contains the list of dealers, and `typeGroups` equals null.
  - All dealers' logos will be displayed directly.
  - "Buy Online" (Show More) button is hidden.

- **Dealers List (More than 4 Dealers):**
  - Response contains the list of dealers and a "typeGroups" attribute with an AJAX link (`href`).
  - The first 4 dealers' logos are displayed directly.
  - "Buy Online" (Show More) button is displayed below the logos. Clicking it triggers the AJAX link from `typeGroups` and opens an overlay/popup.

- **Dealers List Empty but typeGroups Exist (Not Null):**
  - No logos are displayed.
  - "Buy Online" (Show More) button is displayed. Clicking it triggers `href` - the AJAX URL to be used when clicking on the "Buy Online" button, opening an overlay with dealer information.

- **Dealers List Empty AND typeGroups Null:**
  - If both elements are null, the "Buy Online" (Show More) button and logos are hidden.
  - This may occur if BuyOnline configuration is disabled for a website, and the response comes as an empty ArrayList. If a product lacks dealer information, the response won't contain any information.

### Additional Configuration

- BSH needs to activate the 'Display dealers directly in PDP' feature in the admin panel.

- The component requests the AJAX endpoint [Site Prefix]/[country code from catalog]/ajax/product/dealer/integration/buttons[product SKU]. The response provides dealers' data to show logos and the privacy policy URL.

### Configuration Settings

- **Privacy Policy URL:**
  - URL leading to the privacy policy page. If empty, the text with the link at the bottom won't be shown.

- **Buy Online Header:**
  - Translated text displayed at the top of the component.

- **Privacy Policy Text:**
  - Text with a privacy policy link shown if there is a privacy policy URL. Use {{link}} and {{/link}} to create a working link in the text.

- **Font and Margin:**
  - Styles applied to the entire component.

- **Buy Online Padding:**
  - Padding for text at the top of the component.

- **Logo Styles:**
  - Styles for logos.

- **Privacy Policy Padding:**
  - Padding for the privacy policy text.

### EXD Configuration

- Navigate to Product buttons > RETAILER LOGO BUTTON settings in Experience Designer (EXD).
- Set various configurations for the Show More/Show Less button.

Follow these instructions to ensure the optimal presentation and functionality of the Retailer Logo Buttons component. If you encounter any issues, refer to the associated JIRA tasks for further details.