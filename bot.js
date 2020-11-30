console.log("Beep Beep");

const Discord = require('discord.js');
const client = new Discord.Client();
client.login('TOKEN ID');



client.on('ready', ()=>{
    console.log("Logged in Amitesh!");
    console.log("Hello !");
    client.user.setActivity("with Amitesh");
});

var scrims = {};
class Scrim{
    constructor(message,maxPlayer)
    {
        this.message = message;
        this.maxPlayer = maxPlayer;
        this.players = [];
    }

    addPlayer(id)
    {
        this.players.push(id);
        this.annoucnePlayer();
        if (this.players.length === this.maxPlayer)
        {
            this.handlefulMatch();
        }
    }
    annoucnePlayer()
    {
        this.message.channel.send(`There are ${this.players.length} people in the scrim !`);
    }

    handlefulMatch(){
        var teamOne = [];
        var teamTwo = [];
        var shufflePlayer =  shuffle([...this.players]);
        shufflePlayer.forEach((player,i)=>{
            var tag = "<@" + player + ">";
            if(i%2)
            {
                teamOne.push(tag);
            }
            else
            {
                teamTwo.push(tag);
            }
        })

        this.message.channel.send([
            "",
            '***Scim Teams***',
            `Team one: ${teamOne.join(", ")}`,
            '***VS***',
            `Team Two : ${teamTwo.join(", ")}`])
        // ]).then(() =>{
        //     this.message('Scim Filled!');
        //     delete scim[this.message.id];
        // })
    }
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

client.on('message', msg=>{
    if(msg.content.startsWith("+scim"))
    {
        var playerslots = 4;
        var prompttext = `Scrim created with ${playerslots} slots Add reaction to `
        msg.reply(prompttext).then(botMsg=>{
            Scrim[botMsg.id] = new Scrim(botMsg,playerslots);
        })
    }
});

client.on('messageReactionAdd',  async(reaction , user)=>{
    if(reaction.partial)
    {
        //wait for stable notfication
        try{
            await reaction.fetch();
        }
        catch(err)
        {
            console.log("Something Went Wrong !", err);
            return;
        }
    }
    var scim = Scrim[reaction.message.id];
    if(scim)
    {
        scim.addPlayer(user.id);
    }
    // console.log('WOHOOOO ! User Added Reaction !', reaction);
});
    // client.guilds.forEach((guild)=>{
    //     console.log(guild.name);
    //     guild.channels.forEach((channel)=>{
    //         console.log(`$(channel.name) $(channel.type) $(channel.id)`);
    //     });
    // });

// DEMO ---------------------------------------------------------------------------------------------
// const replies = ['Hey there !', 'Hi, How are you !', 'Welcome to Amitesh Bot','Hi ! How You Doin !'];

// client.on('message', gotMessage);
// function gotMessage(msg)
// {
//     console.log(msg.content);
//     if (msg.channel.id === '782973073984323606' && msg.content === 'Amitesh here')
//     {
//         // msg.reply("Hi Amitesh ! Welcome");
//         const r = Math.floor(Math.random()* replies.length);
//         msg.reply(replies[r]);
//     }
// }
//----------------------------------------------------------------------------------------------------

