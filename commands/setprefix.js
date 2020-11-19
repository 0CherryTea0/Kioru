const db = require("../utils/database.js");
const config = require("../config.json")

module.exports = {
    name: "prefix",
    category: "Утилиты",
    description: "Информация о себе",
    usage: "bio <текст>",
    aliases: ["био", "осебе"],
    async execute(message, args) {
        if (!args[0]) {
            const prefix = await db.get(message.guild.id, "guild_settings_prefixes", config.prefix);
            return message.reply(`мой префикс здесь - **${prefix}**\nВы можете его сменить, прописав эту комманду но указав сам префикс.`)
        }

        return db
            .set(message.guild.id, "guild_settings_prefixes", args[0])
            .then(() => message.react("✅"));
    },
};