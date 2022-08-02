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
                rank: user.rank,
                role: user.role,
                server: user.server,
                language: user.language,
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
                rank: user.rank,
                role: user.role,
                server: user.server,
                language: user.language,
                date: date,
            }
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

    static async deleteReview(userId) {
        try {
            return await profiles.deleteOne({user_id: userId});
        } catch(e) {
            console.error(`Unable to delete profile: ${e}`)
            return { error: e};
        }
    }
}