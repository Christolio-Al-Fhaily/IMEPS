package com.ulfg2.imeps.domain;

import java.util.List;

public record PDFRequest(List<String> headers, List<List<String>> rows, String title) {
}
