package ibf2022.batch1.csf.assessment.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.batch1.csf.assessment.server.models.Comment;

@Repository
public class MovieRepository {

	@Autowired
    private MongoTemplate mongoTemplate;
	
	private static final String COMMENTS_COL = "comments";

	public int countComments(Object param) {
		return 0;
	}

	public Comment insertComment(Comment c) {
        return mongoTemplate.insert(c, COMMENTS_COL);
    }

}
