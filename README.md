# UI Portal

The UI Portal project provides a framework for applications (Widget Providers) to expose
their own set of pages (aka Widgets) within a single web application. Widget Providers
don't need to bother with page layouts, security integration or other widely used
cross functionality, the UI Portal takes care of these things.

# Main Functionality

- **Page Layout**. The UI Portal pretends a page layout, consisting of a header pane and a
content pane. Future versions may offer to choose between multiple layouts, for example
with an additional menu tree pane or a footer pane.

- **Security**. The Authentication process is part of the UI Portal and doesn't taken into
account by Widget Providers. The Portal is responsible to authenticate the user via 3rd
party OAuth2 IAM, like self-hosted Keycloak or Auth0.

- **Technology agnostic**. Serving applications may expose the Widgets in varying frontend
technologies. The UI Portal must combine and integrate these different technologies and
make them work together.

- **Global State**. Widgets may need to share data or events. The Portal allows to share
data globally and has a built-in event propagation mechanism to publish events across
Widgets that are realized with different JavaScript frameworks.