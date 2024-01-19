# Compare Component

## Activation and Configuration

To activate the Compare Component, follow these steps:

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

1. **Context Variable Activation:**
   - Login to the platform and navigate to **Settings > Context Settings.**
   - In the context section, locate the context variable named **displayCompareButton.**
   - If the value is set to false, the button will be hidden for the specific assistant; if true, it will be visible.

2. **Comparison Page URL Configuration:**
   - For the comparison page URL, utilize the context variable named **comparisonPageURL.**
   - Specify the desired comparison page URL in this variable.

## Feature Integration

To activate the component, access either the 'Top Product' or 'Recommendations' settings. Please note that the settings contain standard texts only, as the HTML structure is provided externally. The feature might not appear in the EXD preview as it heavily depends on JS provided in testing and production environments.

## Expected Behavior

- Each product tile should have a Compare toggle.
- Toggling should trigger a popup with text and a button, with JS provided by the client and dependent on HTML and data attributes.
- Toggling one product should activate a sticky bar at the bottom.
- After adding at least 2 products, a button with standard texts should be active.
- The sticky bar is heavily dependent on the proper HTML structure provided.

## Links and Navigation

- The links in buttons lead to another page handling the actual comparison.
- The only URL responsibility lies in the sticky bar and can be set in standard texts.

## Dynamic Handling of Country Codes in API Endpoint

The provided code snippet utilizes an API endpoint triggered by a button. The endpoint interacts with a data catalog and checks the "country_code" column. If the column contains a valid country code, it will be automatically included in the API endpoint. If the "country_code" column lacks a country code, it will not be added to the API endpoint.