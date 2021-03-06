const getMember = require("../utils/getMember.js");
const db = require("../utils/database.js");
const Discord = require("discord.js");
const config = require("../config.json")

module.exports = {
    name: "warns",
    category: "Модерация",
    description: "Просмотреть предупреждения участника",
    usage: "warns [участник]",
    aliases: ["преды", "варны"],
    async execute(message, args) {
        let memberId = "";
        if (args[0]) memberId = getMember(args[0]);
        else memberId = message.author.id;

        if (!memberId) return message.channel.send("Укажите участника!");


        const member = message.guild.members.cache.get(memberId);

        const warns = await db.get(`${message.guild.id}||${memberId}`, "users_warns", []);

        const embed = new Discord.MessageEmbed()
            .setTitle(`Предупреждения участника ${member.user.tag}`)
            .setThumbnail(member.user.avatarURL())
            .setColor(config.colors.main);

        if (warns.length === 0) {
            embed.setDescription("У участника нет предупреждений");
            return message.channel.send(embed);
        }

        for (const warn of Array.from(warns)) {
            embed.addField(
                `ID: ${warn.id};\nДата: ${new Date(
                    warn.date,
                ).toLocaleString()};\nМодератор: ${
                    message.guild.members.cache.get(warn.moderator).user.tag
                }`,
                warn.reason,
            );
        }

        return message.channel.send(embed);
    },
};