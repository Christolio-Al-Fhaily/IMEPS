import React, { useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample data
const universities = [
  { name: "Harvard University", location: "USA", flag: "🇺🇸" },
  { name: "Stanford University", location: "USA", flag: "🇺🇸" },
  { name: "University of Oxford", location: "UK", flag: "🇬🇧" },
  { name: "University of Cambridge", location: "UK", flag: "🇬🇧" },
  { name: "ETH Zurich", location: "Switzerland", flag: "🇨🇭" },
  { name: "University of Toronto", location: "Canada", flag: "🇨🇦" },
];

// Unique countries with flags
const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Canada", flag: "🇨🇦" },
];

const UniversityPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const toast = useToast();

  // Handle flag selection
  const handleFlagClick = (country: string) => {
    setSelectedCountry(country);
    toast({
      title: `Showing universities from ${country}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Filter universities by selected country
  const filteredUniversities = selectedCountry
    ? universities.filter((uni) => uni.location === selectedCountry)
    : universities;

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={8} textAlign="center">
        Universities by Country
      </Heading>

      {/* Flag Carousel */}
      <Box mb={10}>
        <Slider {...carouselSettings}>
          {countries.map((country, index) => (
            <Center
              key={index}
              onClick={() => handleFlagClick(country.name)}
              cursor="pointer"
              p={4}
              border={selectedCountry === country.name ? "2px solid teal" : "none"}
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Text fontSize="4xl">{country.flag}</Text>
              <Text mt={2} fontWeight="bold">
                {country.name}
              </Text>
            </Center>
          ))}
        </Slider>
      </Box>

      {/* University Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredUniversities.map((uni, index) => (
          <Box
            key={index}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            <Text fontSize="2xl" fontWeight="bold">
              {uni.name}
            </Text>
            <Text mt={2} color="gray.600">
              {uni.location} {uni.flag}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UniversityPage;