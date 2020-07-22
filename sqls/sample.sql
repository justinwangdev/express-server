select
    containerflow.workno,
    codetable.name,
    codetable.value,
    containerflow.containerno
from
    containerflow,
    codetable
where
    codetable.code = 'H'
    and codetable.value = containerflow.flowno
    and containerflow.workno = '10809023'
order by
    containerno


select
containerflow.workno,
codetable.name,
containerflow.containerno\n
from
containerflow,\n
codetablewhere containerflow.workno = "10903012" and containerflow.containerno = "001" and containerflow.flowno = "3"