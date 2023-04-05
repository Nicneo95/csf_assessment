package ibf2022.batch1.csf.assessment.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.services.MovieService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovieController {

	@Autowired
	private MovieService movieSvc;

	@GetMapping(path = "/search/{movie}")
	@ResponseBody
	public ResponseEntity<String> getMovies(@PathVariable String movie) {

		List<Review> reviews = movieSvc.searchReviews(movie);

		JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
		reviews.stream()
				.forEach(v -> {
					arrBuilder.add(v.toJson());
				});
		return ResponseEntity.ok(arrBuilder.build().toString());
	}
}
