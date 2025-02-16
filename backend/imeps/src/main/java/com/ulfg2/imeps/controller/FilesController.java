package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.PDFRequest;
import com.ulfg2.imeps.domain.PdfGenerator;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/")
public class FilesController {

    @GetMapping("/conventions/{conventionId}/attachement")
    public ResponseEntity<InputStreamResource> getAttachmentByConventionId(@PathVariable int conventionId) throws IOException {
        // Path to your PDF file
        File file = new ClassPathResource("conventions/convention_" + conventionId + ".pdf").getFile();

        // Create InputStreamResource from the file
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        // Set headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> generatePdf(@RequestBody PDFRequest pdfRequest) throws IOException {
        InputStreamResource pdf = PdfGenerator.createPdf(pdfRequest);
        // Set headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=file.pdf");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
