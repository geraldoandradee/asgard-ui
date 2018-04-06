# UI


## Changelog

 * 0.14.0
   > Mudança interna para usar o objeto Bridge em vez do Sieve;
   > Estamos exportando para os plugins os dois objetos: Sieve e Bridge. Isso para podermos atualizar os plugins de forma gradual;

 * 0.13.0
   > IN-2455 IN-2456 Adição de duas novas abas na tela de detahe de uma task, onde podemos visualizar os logs (stdout/stderr)

 * 0.12.0
   > Remoção do código que adicoinava o toke JWT em todos os requests. Agora isso é feito no session-checker-plugin;
   > Essa versão depende só funciona se o plugin session-checker-plugin for versão 0.2.0+;

 * 0.11.0
   > Uso do Semver pra versionamento da imagem docker
   > Cherry-pick do PR 819, que adiciona request pipelines
 * 0.0.10
   > Documentando commits que foram cherry-picked
 * 0.0.9
   > Exportando ajaxWrapper para o objeto Sieve. Depois vamos remover o commit onde ele é exportado diretamente para os plugins
 * 0.0.8
   > Adição do namespace no link pro mesos sandbox
   > Adição do logo do projeto Asgard
   > Mudança da URL da API para https://api-asgard.sieve.com.br/
 * 0.0.7
   > UI atualizada para versão `1.1.7`


## Fluxo de desenvolvimento

A branch `master` deve sempre ficar *identica* à branch master do projeto original (mesosphere/marathon-ui).

A branch `sievetech` é quem recebe todos os commits. De tempos em tempos faremos rebase da `sievetech` em relação à `master`.

## Commit potencialmente conflitantes

Em determinado momento precisaremos fazer commits que mudam o core da UI, nesses casos o commmit é feito na branch `sievetech` e a mensagem
de commit deve começar com `MARATHON-MERGE`. Se essa mudança já possuir um PR aberto, colocamos `MARATHON-MERGE/PR #NNN` indicando o número do PR.

## Commits que com certeza darão conflito

Como o projeto Marathon UI está em uma fase estranha, pois a mesosphere não decidiu ainda o que fazer, sempre que fazermo um PR que é mergeado
esses commits vão para o topo da master do projeto original, mas nossa cópia não necessáriamente esta apontando pra essa cópia, mas ao mesmo tempo
precisa dessas odificações.

O que fazemos então é cherry-pick de todos os commits, individualmente, para a branch `sievetech`, que é nossa branch oficial.

Depois de fazer o cherry pick precisamos fazer um rebase -i para alterar a msg de commit de todos esses commits que acabamos de pegar via cherry-pick. Adicionamos
à msg de commit a seguinte string: `CHERRY-PICK PR/#` onde `#` é o número do PR de onde esses commits vieram.

Dessa forma, quando formos atualizar nosso código para uma versão que já possui esse PR, saberemos quais commits devemos apagar antes de fazer o update. Segue um exemplo
de como fica uma lista de commits da branch `sievetech` após o cherry pick do PR 813.

```
7c108434 Otimizando dockerfile (790MB -> 190MB)
33007441 Dockerfile (non-optimized) funcional
5659917d Ignoring vim files
13effb69 MARATHON-MERGE Mudando titulo para ASGARD
3f3d8a4d MARATHON-MERGE Adiciona namespace no link pro mesos
45f71540 MARATHON-MERGE Adição do JWT token em todos os requests <== Primeiro commit de diferença na nossa branch oficial
ee027423 CHERRY-PICK PR/813 Remove PluginAPI, add Marathon{Service,Actions}
09c2bdd6 CHERRY-PICK PR/813 Using Object destructurin to extract parameters
a6e52413 CHERRY-PICK PR/813 Removing ajaxWrapper import form PluginLoader
aa7fa207 CHERRY-PICK PR/813 Adding *.swp do .gitignore
40821f51 CHERRY-PICK PR/813 Changing namespace methods to be all static
6160c9bc CHERRY-PICK PR/813 Removing ajaxWrapper, now using the new PluginAPI
1bb2625e CHERRY-PICK PR/813 Exporting the new PluginAPI with 2 namespaces
c9eded74 CHERRY-PICK PR/813 Freezing config and not exporting UIVersion
8dcb3b4d CHERRY-PICK PR/813 Exporting ajaxWrapper and config do UI plugins
2e01709b Raise version to 1.1.7 in changelog <<== Último commit oficial do projeto
```

No momento de fazer um novo rebase entre nossa branch oficial e a branch master (atualizada até certo ponto, mas já contendo o PR 813), devemos remover todos os
commits com `CHERRY-PICK PR/813` e depois fazer o rebase.

## Posição dos commits

Tentaremos manter os commits `MARATHON-MERGE*` juntos, de preferência logo no ínício da branch `sievetech`. Para isso ser possível, faremos 
o rewrite do histórico com certa frequência. Atentar para branches já abertas no momento em que fizermos esses rewrites.


## Commits atualmente em nossa branch como resuldato de cherry-picks


# Commits do PR 813: Exporting ajaxWrapper and config to UI plugins
# https://github.com/mesosphere/marathon-ui/pull/813/
```
c8e0e04232fa047e17422d9607dd8e24ec101787 Exporting ajaxWrapper and config do UI plugins
4d3a079fc46ed7173a457689d9b65bf14f4464cd Freezing config and not exporting UIVersion
7d4f957e76363cb5cf39285c30f50b33aab69b3a Exporting the new PluginAPI with 2 namespaces
2cffa4e070015c6556af17b03e40356eb2ebad25 Removing ajaxWrapper, now using the new PluginAPI
dc3531dc3e938ce1d8c40a9c97b784aa23bbbd04 Changing namespace methods to be all static
28e1b3b523192b5403904365176f3988ed31e4e8 Adding *.swp do .gitignore
07341a0f8d460086f23e40b717b0a631f9c4b16a Removing ajaxWrapper import form PluginLoader
7820db1b86ba3d411966a02dd1eda62986601d08 Using Object destructurin to extract parameters
b780383174d1cf200741bd8e87f6bda16ffe3549 Remove PluginAPI, add Marathon{Service,Actions}
```

# Commits do PR 819: Implement request filter pipeline
# https://github.com/mesosphere/marathon-ui/pull/819
```
19bfa55a Implementing filter pipelines and exporting to plugins
```
