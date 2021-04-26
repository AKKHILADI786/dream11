
console.log(team)
console.log(captain)
console.log(vice_captain)

$.get(`/s/t/${window.sessionStorage.user}`,(data)=>{
    console.log(data);
    window.sessionStorage.top=data[0].score;
    console.log(window.sessionStorage.top)
    $('#top_score').text(`${window.sessionStorage.top}`)

})
 
var score = 0.0;
$(async () => {
    //console.log('asdf',window.sessionStorage.top)
    
    $('#toss').text(main_data.info.toss.winner)
    $('#toss-choose').text(main_data.info.toss.decision)
    $('#bat-team').text(main_data.innings[0]['1st innings'].team)
    $('#field-team').text(main_data.innings[1]['2nd innings'].team)
    const inning1 = main_data.innings[0]['1st innings'].deliveries
    const inning2 = main_data.innings[1]['2nd innings'].deliveries
    console.log(inning1)
    // solve(inning1)
    make(inning1, inning2);
    // $.get()
    var a=window.sessionStorage.user;
    $.get(`/s/${a}`,(data)=>{
        let e=0;
        for(p of data){
            e++;
            $('#prev-score').append(`
            <div class="row">
                <div class="col-2">${e}</div>
                <div class="col-7">${p.match}</div>
                <div class="col-3">${p.currscore}</div>
            </div>
            `)
        }
    })
    //check();
})


const batpoint = {
    "50 run": 58,
    "100 run": 116
}

const bowlerpoint = {
    "caught": "25",
    "bowled": "33",
    "run out": "25",
    "lbw": "33",
    "retired hurt": "0",
    "stumped": "25",
    "caught and bowled": "40",
    "hit wicket": "25",
}

// var strike = 0;
// var nonStrinke = 0;

var mapp = new Map();

for (let item of team) {
    mapp.set(item, 0.0);
    //console.log(item)
}

// console.log(mapp)

// console.log(mapp.get(captain));
// mapp.set(captain, mapp.get(captain) + 1)
// console.log(mapp.get(captain));

function make(temp1, temp2) {

    let j = 0;
    const aa = setInterval(() => {


        let ball = Object.keys(temp1[j])[0];
        //console.log(ball)

        let b = {

            over: Object.keys(temp1[j])[0],

            score: temp1[j][ball]

        }
        // console.log(b)
        console.log('currscore',score)
        $('#notification').text(`${b.score.batsman} hits ${b.score.runs.batsman} Runs`)

        if (team.has(b.score.batsman)) {
            let a = mapp.get(b.score.batsman);
            mapp.set(b.score.batsman, mapp.get(b.score.batsman) + parseFloat(b.score.runs.batsman));
            let c = mapp.get(b.score.batsman);
            $('#notification').text(`${b.score.batsman} hits ${b.score.runs.batsman} Runs`)
            if (a < 50 && c >= 50) {
                score -= a;
                score += 58;
                if (b.score.batsman == captain) {
                    score -= a;
                    score += 58;
                    //score += parseFloat(b.score.runs.batsman);
                }
                if (b.score.batsman == vice_captain) {
                    score -= a*0.5;
                    score += 58*0.5;
                    //score += 0.5 * parseFloat(b.score.runs.batsman);
                }
            }
            else if (a < 100 && c >= 100) {
                score -= a;
                score += 116;
                if (b.score.batsman == captain) {
                    score -= a;
                    score += 116;
                    //score += parseFloat(b.score.runs.batsman);
                }
                if (b.score.batsman == vice_captain) {
                    score -= a*0.5;
                    score += 116*0.5;
                    //score += 0.5 * parseFloat(b.score.runs.batsman);
                }
            }
            else {
                score += parseFloat(b.score.runs.batsman);
                if (b.score.batsman == captain) {
                    score += parseFloat(b.score.runs.batsman);
                }
                if (b.score.batsman == vice_captain) {
                    score += 0.5 * parseFloat(b.score.runs.batsman);
                }
            }


        }
        if (b.score.wicket) {
            $('#notification').text(`${b.score.bowler} take wicket of ${b.score.batsman}`)
        }
        if (team.has(b.score.bowler)) {
            if (b.score.wicket) {
            $('#notification').text(`${b.score.bowler} take wicket of ${b.score.batsman}`)

                var s = b.score.wicket.kind;
                var val = parseFloat(bowlerpoint[`${s}`]);
                console.log('bowler',val)
                score += val;
                if (b.score.bowler == captain) {
                    score += val;
                }
                if (b.score.bowler == vice_captain) {
                    score += 0.5 * val;
                }
            } 
        }
        $('#score').text(`${score}`)
        $('#scores').html(`
        <div class="row">
        <div class="col">Batsman</div>
        <div class="col">${b.score.batsman}</div>
    </div>
    <div class="row">
        <div class="col">Bowler</div>
        <div class="col">${b.score.bowler}</div>
    </div>
    <div class="row">
        <div class="col">Non-Stricker</div>
        <div class="col">${b.score.non_striker}</div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="col-6"><h4 class="over">Over</h4></div>
            <div class="col-6"><h4 class="over">${b.over}</h4></div>
        </div>
        <div class="col-3">
            <div class="col-6">Score</div>
            <div class="col-6">${b.score.runs.batsman}</div>
        </div>
        <div class="col-3">
            <div class="col-6">Extra</div>
            <div class="col-6">${b.score.runs.extras}</div>
        </div>
        <div class="col-3">
            <div class="col-6">Total</div>
            <div class="col-6">${b.score.runs.total}</div>
        </div>
    </div>
        `)

        if (j >= (temp1.length - 1)) {
            clearInterval(aa);
            window.alert('second inning started')
            setTimeout(solve(temp2), 5000);
        }
        else {
            j++;
        }

    }, 5000)


    return;
}
function solve(temp) {
    $('#bat-team').text(main_data.innings[1]['2nd innings'].team)
    $('#field-team').text(main_data.innings[0]['1st innings'].team)
    let j = 0;
    const aa = setInterval(() => {


        let ball = Object.keys(temp[j])[0];
        //console.log(ball)

        let b = {

            over: Object.keys(temp[j])[0],

            score: temp[j][ball]

        }
        //console.log(b)
        $('#notification').text(`${b.score.batsman} hits ${b.score.runs.batsman} Runs`)

        console.log( 'currscore',score)
        if (team.has(b.score.batsman)) {
            let a = mapp.get(b.score.batsman);
            mapp.set(b.score.batsman, mapp.get(b.score.batsman) + parseFloat(b.score.runs.batsman));
            let c = mapp.get(b.score.batsman);

            console.log('a value',a)
            if (a < 50 && c >= 50) {
                score -= a;
                score += 58;
                if (b.score.batsman == captain) {
                    score -= a;
                    score += 58;
                    //score += parseFloat(b.score.runs.batsman);
                }
                if (b.score.batsman == vice_captain) {
                    score -= a*0.5;
                    score += 58*0.5;
                    //score += 0.5 * parseFloat(b.score.runs.batsman);
                }
            }
            else if (a < 100 && c >= 100) {
                score -= a;
                score += 116;
                if (b.score.batsman == captain) {
                    score -= a;
                    score += 116;
                    //score += parseFloat(b.score.runs.batsman);
                }
                if (b.score.batsman == vice_captain) {
                    score -= a*0.5;
                    score += 116*0.5;
                    //score += 0.5 * parseFloat(b.score.runs.batsman);
                }
            }
            else {
                score += parseFloat(b.score.runs.batsman);
                if (b.score.batsman == captain) {
                    score += parseFloat(b.score.runs.batsman);
                }
                if (b.score.batsman == vice_captain) {
                    score += 0.5 * parseFloat(b.score.runs.batsman);
                }
            }

        }
        if (b.score.wicket) {
            $('#notification').text(`${b.score.bowler} take wicket of ${b.score.batsman}`)
        }
        if (team.has(b.score.bowler)) {
            if (b.score.wicket) {
                var s = b.score.wicket.kind;
                var val = parseFloat(bowlerpoint[`${s}`]);
                console.log('bowler score' ,val)
                score += val;
                if (b.score.bowler == captain) {
                    score += val;
                }
                if (b.score.bowler == vice_captain) {
                    score += 0.5 * val;
                }
            }
        }

        $('#score').text(`${score}`)
        $('#scores').html(`
        <div class="row">
        <div class="col">Batsman</div>
        <div class="col">${b.score.batsman}</div>
    </div>
    <div class="row">
        <div class="col">Bowler</div>
        <div class="col">${b.score.bowler}</div>
    </div>
    <div class="row">
        <div class="col">Non-Stricker</div>
        <div class="col">${b.score.non_striker}</div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="col-6"><h4 class="over">Over</h4></div>
            <div class="col-6"><h4 class="over">${b.over}</h4></div>
        </div>
        <div class="col-3">
            <div class="col-6">Score</div>
            <div class="col-6">${b.score.runs.batsman}</div>
        </div>
        <div class="col-3">
            <div class="col-6">Extra</div>
            <div class="col-6">${b.score.runs.extras}</div>
        </div>
        <div class="col-3">
            <div class="col-6">Total</div>
            <div class="col-6">${b.score.runs.total}</div>
        </div>
    </div>
        `)

        if (j >= (temp.length - 1)) {
            clearInterval(aa);
            window.alert('match over');
            var top=window.sessionStorage.top;
            console.log('prev top score',top)
            console.log('curr score',score)
            var total=parseFloat(top)+parseFloat(score);
            let id=window.sessionStorage.user;
            console.log('asdfdsf',total,id)
            $.post('/s/t',{
                total,
                user:id
            },(data)=>{
                console.log(data)
            })
            let fir=$('#first-team').text()
            let sec=$('#second-team').text()
            //console.log(`${fir} vs ${sec}`)
            let match_name=`${fir} vs ${sec}`;
            $.post('/s',{
                match:match_name,
                curr:parseFloat(score),
                user:id
            },(data)=>{
                console.log('data added',data)
            })

        }
        else {
            j++;
        }

    }, 5000)
   
    
    return;
}
