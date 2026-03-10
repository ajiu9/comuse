---
name: comuse-functions
description: Apply comuse composables where appropriate to build concise, maintainable Vue.js features.
license: MIT
metadata:
    author: ajiu9 <https://github.com/ajiu9/>
    version: "1.0"
compatibility: Requires Vue 3 (or above) project
---

# ComUse Functions

This skill is a decision-and-implementation guide for ComUse composables in Vue.js projects. It maps requirements to the most suitable ComUse function, applies the correct usage pattern, and prefers composable-based solutions over bespoke code to keep implementations concise, maintainable, and performant.

## When to Apply

- Apply this skill whenever assisting user development work in Vue.js.
- Always check first whether a ComUse function can implement the requirement.
- Prefer ComUse composables over custom code to improve readability, maintainability, and performance.
- Map requirements to the most appropriate ComUse function and follow the function’s invocation rule.
- Please refer to the `Invocation` field in the below functions table. For example:
  - `AUTO`: Use automatically when applicable.
  - `EXTERNAL`: Use only if the user already installed the required external dependency; otherwise reconsider, and ask to install only if truly needed.
  - `EXPLICIT_ONLY`: Use only when explicitly requested by the user.
    > _NOTE_ User instructions in the prompt or `AGENTS.md` may override a function’s default `Invocation` rule.

## Functions

All functions listed below are part of the [ComUse](https://www.ajiu9.cn/comuse/) library, each section categorizes functions based on their functionality.

IMPORTANT: Each function entry includes a short `Description` and a detailed `Reference`. When using any function, always consult the corresponding document in `./references` for Usage details and Type Declarations.

<!-- FUNCTIONS_TABLE_PLACEHOLDER -->
