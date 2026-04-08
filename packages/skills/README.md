# Comuse Skills

Agent Skills for ComUse — a collection of essential Vue Composition Utilities.

- 🪜 Progressive disclosure: send ComUse function overviews first, then load detailed usage and type declarations on demand
- 💰 Minimal token usage: provide only necessary information to reduce token consumption
- 📵 Offline-first design: works without internet access or additional agent permissions
- ⚙️ Customizable policies: users can override function invocation rules in prompts or `AGENTS.md`
- 💉 Reduced hallucinations: precise usage references help prevent invented APIs

## Installation

### Install via [skills-npm](https://github.com/antfu/skills-npm)

`comuse/skills` needs to be used together with [`skills-npm`](https://github.com/antfu/skills-npm) to install agent skills.

First, add a `prepare` script to your `package.json` so the skills are symlinked automatically for your agent whenever you install dependencies:

```json
{
  "scripts": {
    "prepare": "skills-npm"
  }
}
```

Then, install both `skills-npm` and `comuse-skills`:

```bash
npm i -D comuse-skills skills-npm
```

## Example Usage

Install ComUse in your Vue or Nuxt project, then instruct the agent. It will automatically leverage ComUse to assist development.

Example prompt:

```
create a todo app with the following features:
- save todos to local storage
- show remains todo count on browser title
- add a copy button for each todo items
- infinite scrolling for this todo list
- dark / light mode
```
## License

MIT
