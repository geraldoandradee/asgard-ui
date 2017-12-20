
The original Marathon UI README is located in [original-README.md](original-README.md).

# Note about this Repository

This is the User interface for the Asgard project. The ideia is to have Mararthon UI enhanced with a set of plugins to offer:

* True multi-tenancy, that is, multiple teams are able to use the same web interface but at the same time each team only views/modifies their own set of tasks. Also each team can optionally run their tasks on completely separated servers.
* Autentication via outh2. Currently only Google is supported.
* Authorization: The ability to give permisions to each user.
* Any other features that we think should be implemented and that is not included on original Marathon UI project.

## How this project is developed

The main idea is to implement **every** new feaature as a Marathon UI Plugin. If the plugin is currently not possible to implement, we change the core Marathon UI to make it possible do implement it. With every modificatio to the UI is opened a Pull Request on the original project. As soon as the PR is merged, we merge the implementation to this project and remove any intermediate commit that we may have nbeen using during the Pull Request review/merge cycle.

One example of such change to the core UI is this PR:

* https://github.com/mesosphere/marathon-ui/pull/813

This way we can, at the same time, have new implementations on this repo and merge new features that eventually are developed in the original project.

More os this on thei file [sieve/README.md](sieve/README.md).

