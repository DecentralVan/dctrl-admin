const r = require('rethinkdb')


const listOfMemberPaidActions = []
const listOfMemberChargedActions = []

// todo time filter
function getEventsForAddress( conn, address, callback ){
  r
      .table('events')
      .filter({action: { address }})
      // .group( r.row('action')['type'] )
      // can this work?
      .run(conn, function(err, cursor) {
          console.log('address filter on')

          cursor.each( (err, ev)=>{
                switch (ev.action.type) {
                    case 'member-charged':
                        listOfMemberChargedActions.push(ev.action)
                        break
                    case 'member-paid':
                        listOfMemberPaidActions.push(ev.action)
                        break
                }
          }, (err, results)=> {

            console.log({
                listOfMemberPaidActions,
                listOfMemberChargedActions,
            })

          })
      })

}



r.connect({
        db: 'eventstate',
        host: '192.168.0.109'
    }).then(conn => {

        getEventsForAddress(conn, '3GER8rjmFqypKbdwajGPs8YxXTYqLM51Cc')



    })
