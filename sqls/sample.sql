select
    a.workno,
    b.name,
    a.containerno
from
    containerflow a,
    codetable b
order by
    containerno
where
    b.code = 'H'
    and b.value = a.flowno
    and workno = '10809023'