import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchCountries,
  fetchUniversities,
  fetchLogosForUniversities,
} from "../services/universityService.tsx";

interface Country {
  id: number;
  countryName: string;
  countryCode: string;
}

interface University {
  id: number;
  name: string;
  location: string;
  countryCode: string;
  logoUrl?: string; // Optional field for logo URL
}

const UniversityPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loadingLogos, setLoadingLogos] = useState<boolean>(false);
  const toast = useToast();

  // Hardcoded credentials (replace with actual login logic)
  const username = "your-username";
  const password = "your-password";

  // Fetch countries from the backend
  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries(username, password); // Pass credentials
      console.log("Countries loaded:", data); // Debugging
      setCountries(data);
    };
    loadCountries();
  }, [username, password]);

  // Fetch universities from the backend
  useEffect(() => {
    const loadUniversities = async () => {
      const data = await fetchUniversities(username, password); // Pass credentials
      console.log("Universities loaded:", data); // Debugging
      setUniversities(data);
      setLoadingLogos(true);
      const updatedUniversities = await fetchLogosForUniversities(data);
      console.log("Universities with logos:", updatedUniversities); // Debugging
      setUniversities(updatedUniversities);
      setLoadingLogos(false);
    };
    loadUniversities();
  }, [username, password]);

  // Handle flag selection
  const handleFlagClick = (countryName: string) => {
    setSelectedCountry(countryName);
    toast({
      title: `Showing universities from ${countryName}`,
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
          {countries.map((country) => (
            <Center
              key={country.id}
              onClick={() => handleFlagClick(country.countryName)}
              cursor="pointer"
              p={4}
              border={selectedCountry === country.countryName ? "2px solid teal" : "none"}
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Image
                src={`https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`}
                alt={country.countryName}
                boxSize="50px"
                mb={2}
              />
              <Text fontWeight="bold">{country.countryName}</Text>
            </Center>
          ))}
        </Slider>
      </Box>

      {/* University Grid */}
      {loadingLogos ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni) => (
              <Box
                key={uni.id}
                p={5}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
              >
                {/* University Logo */}
                {uni.logoUrl ? (
                  <Image
                    src={uni.logoUrl}
                    alt={uni.name}
                    boxSize="100px"
                    mx="auto"
                    mb={4}
                  />
                ) : (
                  <Box boxSize="100px" mx="auto" mb={4} bg="gray.200" borderRadius="md" />
                )}
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                  {uni.name}
                </Text>
                <Text mt={2} color="gray.600" textAlign="center">
                  {uni.location}{" "}
                  <Image
                    src={`https://flagcdn.com/${uni.countryCode.toLowerCase()}.svg`}
                    alt={uni.location}
                    boxSize="20px"
                    display="inline-block"
                    verticalAlign="middle"
                    ml={2}
                  />
                </Text>
              </Box>
            ))
          ) : (
            <Text textAlign="center" fontSize="lg" color="gray.500">
              No universities found.
            </Text>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default UniversityPage;