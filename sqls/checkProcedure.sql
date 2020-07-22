select
    containerflow.workno,
    codetable.name,
    containerflow.containerno,
    containerflow.goweight
from
    containerflow,
    codetable
where
    codetable.value = containerflow.flowno
    and codetable.code = 'H'