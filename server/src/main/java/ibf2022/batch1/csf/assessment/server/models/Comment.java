package ibf2022.batch1.csf.assessment.server.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Comment {
    private String charId;
    private String name;
    private String rating;
    private String comment;

    public String getCharId() {
        return charId;
    }

    public void setCharId(String charId) {
        this.charId = charId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public static Comment create(Document d) {
        Comment c = new Comment();
        c.setCharId(d.getObjectId("charId").toString());
        c.setName(d.getString("name"));
        c.setRating(d.getString("rating"));
        c.setComment(d.getString("comment"));
        return c;
    }

    public JsonObject toJSON() {

        return Json.createObjectBuilder()
                .add("charId", getCharId())
                .add("name", getName())
                .add("rating", getRating())
                .add("comment", getComment())
                .build();
    }
}
