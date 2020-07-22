select
    containerflow.workno,
    codetable.name,
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