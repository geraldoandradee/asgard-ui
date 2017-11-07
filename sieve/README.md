# UI


## Changelog

 * 0.0.8
   > Adição do namespace no link pro mesos sandbox
   > Adição do logo do projeto Asgard
 * 0.0.7
   > UI atualizada para versão `1.1.7`


## Fluxo de desenvolvimento

A branch `master` deve sempre ficar *identica* à branch master do projeto original (mesosphere/marathon-ui).

A branch `sievetech` é quem recebe todos os commits. De tempos em tempos faremos rebase da `sievetech` em relação à `master`.

## Commit potencialmente conflitantes

Em determinado momento precisaremos fazer commits que mudam o core da UI, nesses casos o commmit é feito na branch `sievetech` e a mensagem
de commit deve começar com `MARATHON-MERGE`. Se essa mudança já possuir um PR aberto, colocamos `MARATHON-MERGE/PR #NNN` indicando o número do PR.


## Posição dos commits

Tentaremos manter os commits `MARATHON-MERGE*` juntos, de preferência logo no ínício da branch `sievetech`. Para isso ser possível, faremos 
o rewrite do histórico com certa frequência. Atentar para branches já abertas no momento em que fizermos esses rewrites.
