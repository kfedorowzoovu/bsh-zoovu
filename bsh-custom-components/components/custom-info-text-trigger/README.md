# Info Text Modal and Modal Trigger - README

## Development

`yarn install` - Kindly execute the `yarn install` command at the root level of the parent folder named "bsh-custom-components." This will install all dependencies at the root level, ensuring that they are shared across all custom remote components.

`yarn build [--watch]` - Utilize the `yarn build` command for your project, optionally with the `--watch` flag. This enables continuous monitoring, ensuring that any changes made will trigger the generation of the component with the latest updates, keeping it synchronized with the Experience Designer (EXD) open in your browser.

`yarn dev` - This command runs the project in development mode, allowing you to view your remote component in the Experience Designer (EXD). Log in to your Conversational Studio account, open the Experience Designer, and your component will be displayed within the EXD interface.

## Overview

This document provides information and instructions for the Info Text Modal and Modal Trigger component. This component enhances the user experience by providing information through modal dialogs triggered by custom icons or tooltips.

## Component Availability

The Info Text Modal and Modal Trigger component is available for all answers.

## Activation Instructions

To activate the feature, follow these steps:

1. **Select 'Flow Step' Component:**
   - Open the 'Answer Description' setting for the relevant 'Flow Step' component.

2. **Activate Info Text Modal:**
   - Activate the Info Text Modal within the 'Answer Description' setting.

3. **Go to 'Custom Info Text Trigger' Settings:**
   - Navigate to the 'Custom Info Text Trigger' settings.

## Setting Up Info Text Trigger

In the 'Custom Info Text Trigger' settings, you can configure the following:

### Tooltip Text

- Translated text for all locations.
- Text will be shown in the tooltip on hover over the Info Text button.
- Tooltip is displayed if there is an iframe inside the Info Text.

### Icon Styles

- The icon will have an arrow instead of 'i' if there is an iframe inside the Info Text.

### Tooltip Styles

- Styles for the tooltip.

### Info Text Modal Styles

#### For Modals Without Video (Small Modal)

- 'Small Modal Size' and 'Small Modal Padding' settings for modal.
- Displayed if there is no iframe inside the Info Text.

#### For Modals With Video

- 'Modal with Video Size' and 'Padding' settings for modal.
- Displayed if there is an iframe inside the Info Text.

### Closing Modals

- Both modals can be closed by clicking the close button or clicking outside the modal.

### Filters Section Variant

- For the Filters section, a new variant should be selected to apply the custom Info Text modal.

## Note

Ensure that you configure the settings appropriately to align with your desired user experience. If you encounter any issues or have questions, refer to the associated JIRA Task [CD-10188] for further details.

Thank you for using the Info Text Modal and Modal Trigger component to enhance your interactive flows on the Zoovu platform. If you have any additional questions or concerns, please reach out to the support team.