# Intro

This is a repo :gem: _**Bsh**_ :gem: for Zoovu's ExD remote components :books:!

This repo is based on `yarn workspace`, so you can have there separated, multiple workspaces/components (kind of repos) :books:

> :warning: Please locate all components in folder `./components` in separate subfolders

# :point_right: TODO for you to START your new repo :point_left:

:confused:?

How to use this Bsh:

1. **Duplicate this repo to create repo of your customer with remote-components** <br/>
   Follow: https://stackoverflow.com/questions/45824867/how-to-duplicate-a-git-repository-on-gitlab-github-without-forking <br/>
   or follow: https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository
2. Ensure your _**Win10 Webstorm/Idea IDE**_ is using `git.exe` for husky purpose (at setting: `Version Control` > `Git` > `<Path to Git executable>`).
3. **Create multiple components in your new repo** <br/>
   You can duplicate `remote-component-example` folder/workspace to get desire remote-components count in your project
4. **Install all dependencies of all workspaces** <br/>
   `yarn` or `yarn install` // from `root of all workspaces`; it inits husky as well
5. **Update this global `README.md`** <br/>
   Follow below subchapter: "Template of this global `README.md` of your new repo"
6. **Now you can update code of each component/workspace individually** <br/>
   Follow: `Readme.md` of `remote-component-example` (you will find there also how to build and start-server in localhost)

I hope now is more clear 

:sunglasses:

## Template of this global `README.md` of your new repo

Use below template as this global `README.md` <br/>
(:wastebasket: and remove the rest of this global `README.md` :wastebasket:, eventually keep chapter "Applied tools details for newbies"):

```
# Intro

This is repo of ExD remote components for:
- server: `<ServerName>`
- customer: `<Customer Account Name>`
- assistant: `<Assistant Name>`, `<Assistant Theme Name>` , ... 
- theme: `<Theme Name>`, `<Other Theme Name>` , ... 

<hr/>

This repo is based on `yarn workspace`, so you can have there separated, multiple workspaces/components (kind of repos)

# Install (all dependencies of all workspaces)

From `root of all workspaces` (this folder) execute command:

`yarn` or `yarn install` 

It inits husky as well 

# Serve, Update, Build component

Refer to each `README.md` of each single workspace/component 

> Execute appropriate command/script from root of component/workspace

# Adding new component 

1. Pls use as a template remote-component-example of Bsh
2. :warning: Please locate your component separate subfolder/workspace in folder `./components`
```

<br/><hr/><hr/><hr/>

# Applied tools details for newbies

<details>
<summary>
yarn-workspace
</summary>

> `root of all workspaces` means top catalogue of all workspaces

## Install (all dependencies of all workspaces)

Thanks to `yarn workspace` you can install all dependencies of all workspaces from `root of workspaces` / this folder (instead from each workspace/component separately):

`yarn` or `yarn install`

> It inits husky as well

## Common dependencies (at `root of all workspaces`)

Thanks to `yarn workspace` you can have common dependencies for all workspaces set at `package.json` of `root of workspaces`:

- Zoovu's prettier configuration
- husky

## Common settings (at `root of all workspaces`)

Thanks to `yarn workspace` you can have few setting-files valid for all workspaces from `root of all workspaces`
(instead to keep them at each separate workspace, but you can have them also inside single workspace to be valid for this workspace):

- git: `.gitignore`, `.gitignore`
- nvm/Node: `.nvmrc`
- npm/yarn: `.npmrc`
- husky: `./.husky`
- prettier (used your IDE & at `pre-commit` of husky): `.prettierrc`, `.prettierignore`
- commitlint (used at `commit-msg` of husky): `.commitlint.config.js`

## TS's and ESLint's configs (individual at each workspace)

Configurations of both TS and ESLint should be located at each single `workspace`.

(explanation: `tsconfig.json` is used during build at single/local workspace; `.eslintrc.js` is using `tsconfig.json` which is local)

</details>

<hr/>

<details>
<summary>
prettier
</summary>

## Activate

### Webstorm / Idea

1. Open prettier's Webstorm's settings (`Ctrl+Alt+S`): `Languages & Framework` -> `Javascript` -> `Prettier`
2. Set `Prettier package` path: `~\<your_local_repos_folder>\<your_remote_repo_folder>\node_modules\prettier`

## Usage

> At each single file press `Ctrl+Shift+Alt+P`

</details>

<hr/>

<details>
<summary>
husky
</summary>

> > > Ensure your _**Win10 Webstorm/Idea IDE**_ is using `git.exe` (for example: `C:\Program Files\Git\cmd\git.exe`) <br/>
> > >
> > > Check Webstorm settings (`Ctrl+Alt+S`): <br/> 
> > > > `Version Control` -> `Git` -> `<Path to Git executable>` <br/>
> > >
> > > For further details refer: https://youtrack.jetbrains.com/issue/IDEA-214629

</details>
