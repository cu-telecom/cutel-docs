# CuTEL-Docs

The content that makes up [docs.cutel.net](https://docs.cutel.net)

PRs accepted!

# Contributing 

The site is built using [mkdocs](https://www.mkdocs.org/) and the [material](https://squidfunk.github.io/mkdocs-material/) theme.

Adding or editing content is reasonably self-explanatory, but for more information see the [mkdocs user-guide](https://www.mkdocs.org/user-guide/). One common "gotcha" is when adding pages, you must update the `nav` section in `mkdocs.yml`

To get started, fork `https://github.com/cu-telecom/cutel-docs.git` to your own Github account and clone it locally.

Then you need to setup the environment:

```
cd cutel-docs
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
Make your edits and preview them by running:

```
mkdocs serve
```

This will create a local preview of your page, usually accessible on [http://127.0.0.1:8000](http://127.0.0.1:8000). Use `ctrl + C` to shutdown the preview.

You can deactivate the venv with:

```
deactivate
```

Once you're happy with your changes, commit them, push them back to your forked repo, and submit a PR.

# License

This project is licensed under the MIT license. See LICENSE for Details.