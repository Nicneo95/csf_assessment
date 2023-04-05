package ibf2022.batch1.csf.assessment.server.services;

import java.io.IOException;
import java.io.StringReader;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.batch1.csf.assessment.server.models.Review;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;;

@Service
public class MovieService {

	public static final String API_URI = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

	// @Value("${apiKey}")
	private String apiKey = "AmAXQVr6dn5ud4yWpki8z1QKDyYsUvZC";

	public List<Review> searchReviews(String query) {

		String url = UriComponentsBuilder.fromUriString(API_URI)
				.queryParam("query", query)
				.queryParam("api-key", apiKey)
				.toUriString();
				
		System.out.println(url);

		RequestEntity<Void> req = RequestEntity.get(url)
				.accept(MediaType.APPLICATION_JSON)
				.build();

		RestTemplate template = new RestTemplate();

		ResponseEntity<String> resp = null;

		try {
			resp = template.exchange(req, String.class);
		} catch (RestClientException ex) {
			ex.printStackTrace();
			return Collections.EMPTY_LIST;
		}

		String payload = resp.getBody();
		JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject reviewResp = reader.readObject();
		JsonArray jsonArr = reviewResp.getJsonArray("results");

		return jsonArr.stream()
				.map(v -> v.asJsonObject())
				.map(Review::toReview)
				.toList();
	}

}
