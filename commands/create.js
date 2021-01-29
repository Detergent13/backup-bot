const backup = require('discord-backup');
const config = require('../config.json');
const save = require("save-file");

backup.setStorageFolder("./backups")

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    backup.create(message.guild).then((backupData) => {
		message.guild.members.fetch().then((members) => {
				let stripped = "";
				let memArray = members.array();
				for (i = 0; i < memArray.length; i++) {
					let rn = "None"
					if(memArray[i].roles.highest.name != null)
						rn = memArray[i].roles.highest.name;
					stripped += (memArray[i].id+" "+"\("+rn+"\)\n")
				}
				save(stripped, "./backups/"+backupData.id.toString()+"-members.txt");
			}).catch((err) => {
				console.log(err);
			});
        return message.channel.send('Backup created! Here is your ID: `'+backupData.id+'`! Use `'+config.prefix+'load-backup '+backupData.id+'` to load the backup on another server!');

    }).catch(() => {

        return message.channel.send(':x: An error occurred, please check if the bot is administrator!');

    });

};
