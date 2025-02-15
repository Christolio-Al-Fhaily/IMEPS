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
import useAxiosAuth from "../hooks/useAxiosAuth";
import {
  fetchCountries,
  fetchUniversities,
  University,
  Country,
} from "../services/universityService";

const UniversityPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const axiosInstance = useAxiosAuth("admin", "password");

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("📡 Fetching countries...");
        const countriesData = await fetchCountries(axiosInstance);
        setCountries(countriesData);

        console.log("📡 Fetching universities...");
        const universitiesData = await fetchUniversities(axiosInstance);
        setUniversities(universitiesData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [axiosInstance, toast]);

  const handleFlagClick = (country: Country) => {
    setSelectedCountry(country); // Toggle selection

    toast({
      title: `Showing universities from ${country.code}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const filteredUniversities = selectedCountry
    ? universities.filter((uni: University) => uni.country.code === selectedCountry.code)
    : universities;

  return (
    <Box p={5}>
      <Heading as="h1" mb={8} textAlign="center">
        Universities by Country
      </Heading>

      {
        loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <Box mb={10}>
              <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1}>
                {countries.map((country: Country) => (
                  <Center
                    key={country.code}
                    onClick={() => handleFlagClick(country)}
                    cursor="pointer"
                    p={4}
                    border={selectedCountry?.code === country.code ? "2px solid teal" : "none"}
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Image
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={country.name}
                      boxSize="50px"
                      mb={2}
                    />
                    <Text fontWeight="bold">{country.name}</Text>
                  </Center>
                ))}
              </Slider>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {
              filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni: University) => (
                  <Box
                    key={uni.id}
                    p={5}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    onClick={() => {
                      const element = document.getElementById(`uni-${uni.id}`);
                      if (element) {
                        element.style.display = element.style.display === "none" ? "block" : "none";
                      }
                    }}
                  >
                    {uni.logoUrl ? (
                      <Image src={uni.logoUrl} alt={uni.name} boxSize="100px" mx="auto" mb={4} />
                    ) : (
                      <Box boxSize="100px" mx="auto" mb={4} bg="gray.200" borderRadius="md" />
                    )}
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                      {uni.name}
                    </Text>
                    <Box id={`uni-${uni.id}`} display="none" mt={4} maxHeight="200px" overflowY="auto">
                      <Text fontSize="md" color="gray.600">
                        More details about {uni.name}.
                      </Text>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text textAlign="center" fontSize="lg" color="gray.500">
                  No universities found.
                </Text>
              )}
            </SimpleGrid>
          </>
        )
      }
    </Box>
  );
};

export default UniversityPage;
