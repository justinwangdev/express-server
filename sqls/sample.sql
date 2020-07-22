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
    containerno;

select
    containerflow.workno,
    codetable.name,
    containerflow.containerno,
    containerflow.goweight
from
    containerflow,
    codetable
where
    containerflow.workno = "10809023"
    and codetable.value = containerflow.flowno
    and codetable.code = 'H'