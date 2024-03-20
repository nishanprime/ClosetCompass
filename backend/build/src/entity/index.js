"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentEntity = exports.DislikesEntity = exports.LikesEntity = exports.PostEntity = exports.MediaEntity = exports.SpecialEventEntity = exports.OutfitCalenderEntity = exports.OutfitAndClothEntity = exports.OutfitEntity = exports.ClothAndTagEntity = exports.TagEntity = exports.ClothEntity = exports.UserEntity = void 0;
const cloth_and_tags_entity_1 = __importDefault(require("./cloth_and_tags.entity"));
exports.ClothAndTagEntity = cloth_and_tags_entity_1.default;
const cloth_entity_1 = __importDefault(require("./cloth_entity"));
exports.ClothEntity = cloth_entity_1.default;
const outfit_entity_1 = __importDefault(require("./outfit.entity"));
exports.OutfitEntity = outfit_entity_1.default;
const outfit_and_cloth_entity_1 = __importDefault(require("./outfit_and_cloth.entity"));
exports.OutfitAndClothEntity = outfit_and_cloth_entity_1.default;
const outfit_calender_entity_1 = __importDefault(require("./outfit_calender.entity"));
exports.OutfitCalenderEntity = outfit_calender_entity_1.default;
const special_event_entity_1 = __importDefault(require("./special_event.entity"));
exports.SpecialEventEntity = special_event_entity_1.default;
const tag_entity_1 = __importDefault(require("./tag.entity"));
exports.TagEntity = tag_entity_1.default;
const user_1 = __importDefault(require("./user"));
exports.UserEntity = user_1.default;
const media_entity_1 = __importDefault(require("./media.entity"));
exports.MediaEntity = media_entity_1.default;
const post_entity_1 = __importDefault(require("./post.entity"));
exports.PostEntity = post_entity_1.default;
const likes_entity_1 = __importDefault(require("./likes.entity"));
exports.LikesEntity = likes_entity_1.default;
const dislikes_entity_1 = __importDefault(require("./dislikes.entity"));
exports.DislikesEntity = dislikes_entity_1.default;
const comment_entity_1 = __importDefault(require("./comment.entity"));
exports.CommentEntity = comment_entity_1.default;
exports.default = {
    UserEntity: user_1.default,
    ClothEntity: cloth_entity_1.default,
    TagEntity: tag_entity_1.default,
    ClothAndTagEntity: cloth_and_tags_entity_1.default,
    OutfitEntity: outfit_entity_1.default,
    OutfitAndClothEntity: outfit_and_cloth_entity_1.default,
    OutfitCalenderEntity: outfit_calender_entity_1.default,
    SpecialEventEntity: special_event_entity_1.default,
    MediaEntity: media_entity_1.default,
    PostEntity: post_entity_1.default,
    LikesEntity: likes_entity_1.default,
    DislikesEntity: dislikes_entity_1.default,
    CommentEntity: comment_entity_1.default,
};
//# sourceMappingURL=index.js.map