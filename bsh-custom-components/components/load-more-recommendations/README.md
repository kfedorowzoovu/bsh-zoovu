# Load More Button for Custom Recommendations - README

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

## Overview

This document provides information and instructions for the Load More Button for Custom Recommendations component.

## Implementation Details

We have introduced a new custom component named the "Load More" button specifically for the BSH section. This button operates in a unique manner: when there are three clusters of products in the advisor object, the button will automatically hide the third cluster. Upon clicking the button, it will reveal the previously hidden third cluster of products.

To ensure optimal functionality, it is crucial to disable the existing "Load More" button that is utilized across all themes and replace it with our custom version. The current global button incorporates a caching mechanism for products, which may lead to issues with filtering. By adopting the custom button, we can mitigate these problems effectively. Please refer to the provided screenshot for an example of how the custom button should appear.

Additionally, we have implemented configurations that enable the application of styling to the custom "Load More" button.

## Activation Instructions

Follow these steps to integrate the custom "Load More" button into your application:

1. **Disable Existing Load More Button:**

   - Ensure the current global "Load More" button is disabled to prevent conflicts with the custom version.

2. **Replace with Custom Button:**

   - Integrate the custom "Load More" button specifically designed for BSH to enhance functionality and avoid caching issues.

3. **Apply Styling Configurations:**
   - Utilize the provided configurations to apply styling to the custom "Load More" button, ensuring it aligns with your theme and visual preferences.

## Configurations

The custom "Load More" button comes with configurations that allow for easy styling adjustments. These configurations provide flexibility in tailoring the button's appearance to match the overall design of your application.

## Note

Ensure that you follow these instructions carefully to seamlessly integrate the custom "Load More" button and enhance the user experience in the BSH section. If you encounter any issues or have questions, please refer to the associated JIRA Task [CD-16295] for further details.

Thank you for adopting the Load More Button for Custom Recommendations component. If you have additional inquiries or require support, please reach out to our support team.
