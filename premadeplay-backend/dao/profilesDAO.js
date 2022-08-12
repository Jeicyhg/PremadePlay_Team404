import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let profiles;

export default class ProfilesDAO {

    static async injectDB(conn) {
        if(profiles) {
            return;
        }
        try {
            profiles = await conn.db(process.env.PLAYERREVIEWS_NS).collection('profile');
        } catch(e){
            console.error(`Unable to establish connection handle in reviewsDA: ${e}`);
        }
    }

    static async addProfile(user, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                solo_rank: user.solo_rank,
                flex_rank: user.flex_rank,
                tft_rank: user.tft_rank,
                primary_role: user.primary_role,
                secondary_role: user.secondary_role,
                server: user.server,
                language: user.language,
                profile_pic: user.profile_pic,
                date: date,
            }
            return await profiles.insertOne(reviewDoc);
        }
        catch(e) {
            console.error(`Unable to post profile: ${e}`)
            return { error: e};
        }
    }
    
    static async updateProfile(user, date) {
        try {
            const newReviewDoc = {
                name: user.name,
                user_id: user._id,
                solo_rank: user.solo_rank,
                flex_rank: user.flex_rank,
                tft_rank: user.tft_rank,
                primary_role: user.primary_role,
                secondary_role: user.secondary_role,
                server: user.server,
                language: user.language,
                profile_pic: user.profile_pic,
                date: date,
            }
            console.log(newReviewDoc);
            const change = await profiles.updateOne({user_id: user._id}, {$set: newReviewDoc});
            if(change.modifiedCount === 0) {
                throw new Error('Nothing change');
            } else {
                return change;
            }
        } catch(e) {
            console.error(`Unable to upate profile: ${e}`)
            return { error: e};
        }
    }

    static async deleteProfile(userId) {
        try {
            return await profiles.deleteOne({user_id: userId});
        } catch(e) {
            console.error(`Unable to delete profile: ${e}`)
            return { error: e};
        }
    }
}