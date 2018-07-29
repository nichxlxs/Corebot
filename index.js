const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.name} is online!`);
    bot.user.setActivity("$help | @nicholxs#7891");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}warn`){

        //!warn @player askin for it
    
        let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return message.channel.send("Can't find user!");
        let wReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    
        let warnEmbed = new Discord.RichEmbed()
        .setDescription("Warnings")
        .setColor("#e56b00")
        .addField("Warned User", `${wUser} with ID ${wUser.id}`)
        .addField("Warned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Warned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", wReason);
    
        let warnChannel = message.guild.channels.find(`name`, "incidents");
        if(!warnChannel) return message.channel.send("Can't find incidents channel.");
    
        warnChannel.send(warnEmbed);
    
        return;
      }

    if(cmd === `${prefix}report`){

        //$report @player this is the reason
    
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let rreason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);
    
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    
        return;
      }

    if(cmd === `${prefix}botinfo`){

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);
    
        return message.channel.send(botembed);
      }

    if(cmd === `${prefix}serverinfo`){

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);
    
        return message.channel.send(serverembed);
      }      

});

bot.login(botconfig.token);
